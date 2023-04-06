using ATCD.Backend.Business.Converter.AudioTrip;
using ATCD.Backend.Dto.AudioTrip;
using ATCD.DataAccess.Entity;
using ATCD.DataAccess.Repository;
using nClam;
using System.Drawing.Imaging;
using System.Text.Json;

namespace ATCD.Backend.Business.Domains
{
    internal class ImportDomain
    {
        private readonly AuthorRepository authorRepository;
        private readonly SongRepository songRepository;
        private readonly LocalFileHandlerDomain fileHandlerDomain;
        private readonly VirusCheckDomain virusCheckDomain;

        public ImportDomain()
        {
            authorRepository = new AuthorRepository();
            songRepository = new SongRepository();
            fileHandlerDomain = new LocalFileHandlerDomain();
            virusCheckDomain = new VirusCheckDomain();
        }

        internal async Task PerformInitialImportAsync()
        {
            DirectoryInfo importDirectoryInfo = new(@"C:\Temp\ATCD");
            foreach (var atsFileInfo in importDirectoryInfo.GetFiles("*.ats"))
            {
                
                try
                {
                    var songDto = await ProcessAtsFileAsync(atsFileInfo);
                    if (songDto == null) continue;
                    var oggProcessed = await ProcessOggFileAsync(importDirectoryInfo, songDto);
                    if (oggProcessed)
                    {
                        await ProcessSongInitialAsync(songDto);
                    }
                }
                catch (Exception ex)
                {
                    var blubber = 1;
                    throw;
                }

            }
        }

        #region Helper methods

        private async Task<SongDto> ProcessAtsFileAsync(FileInfo fileInfo)
        {
            var atsContent = File.ReadAllText(fileInfo.FullName);
            using var ms = new MemoryStream();
            fileInfo.OpenRead().CopyTo(ms);
            byte[] fileBytes = ms.ToArray();
            var scanResult = await virusCheckDomain.CheckForVirusAsync(fileBytes);
            if (scanResult.Result == ClamScanResults.Clean)
            {
                SongDto songDto = JsonSerializer.Deserialize<SongDto>(atsContent);
                fileHandlerDomain.StoreFile(songDto.Metadata.SongId, atsContent, "ats");
                return songDto;
            }
            return null;
        }

        private async Task<bool> ProcessOggFileAsync(DirectoryInfo directoryInfo, SongDto songDto)
        {
            var oggFileInfo = directoryInfo.GetFiles(songDto.Metadata.SongFilename).Single();
            using var ms = new MemoryStream();
            oggFileInfo.OpenRead().CopyTo(ms);
            byte[] fileBytes = ms.ToArray();
            var scanResult = await virusCheckDomain.CheckForVirusAsync(fileBytes);
            if (scanResult.Result == ClamScanResults.Clean)
            {
                fileHandlerDomain.StoreFile(songDto.Metadata.SongId, fileBytes, "ogg");
                return true;
            }
            return false;
        }

        private async Task ProcessSongInitialAsync(SongDto songDto)
        {
            // Save author (use existing author if available)
            var authorToSave = songDto.Metadata.Author.ToEntity();
            var author = await authorRepository.SaveAuthorInitialAsync(authorToSave);

            // Save koreography (use existing koreography if available)
            var koreography = songDto.Metadata.Koreography.ToEntity();
            songRepository.SaveKoregraphy(koreography);

            // Save song (use existring song if available)
            var song = songDto.ToEntity();
            song.Author = author;
            song.AuthorKey = author.AuthorKey;
            song.Koreography = koreography;
            song.KoreographyKey = koreography.KoreographyKey;

            foreach (Choreography choreography in song.Choreographies)
            {
                choreography.ChoreographyType = ParseChoreographyType(choreography.Name);
            }

            songRepository.SaveSongBySongId(song);
        }

        private ChoreographyType ParseChoreographyType(string type)
        {
            if (type.Contains("easy", StringComparison.InvariantCultureIgnoreCase))
            {
                return ChoreographyType.Easy;
            }
            else if (type.Contains("regular", StringComparison.InvariantCultureIgnoreCase))
            {
                return ChoreographyType.Regular;
            }
            else if (type.Contains("expert", StringComparison.InvariantCultureIgnoreCase))
            {
                return ChoreographyType.Expert;
            }
            else if (type.Contains("cardio", StringComparison.InvariantCultureIgnoreCase))
            {
                return ChoreographyType.Cardio;
            }
            else
            {
                return ChoreographyType.Unknown;
            }
        }

        #endregion
    }
}