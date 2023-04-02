using ATCD.Backend.Business.Domains;
using ATCD.Backend.Dto.AudioTrip;
using ATCD.Backend.Dto.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using nClam;
using System.Text.Json;

namespace ATCD.Backend.WebApp.Controllers
{
    [Route("api/songs")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        private readonly SongDomain songDomain;
        private readonly VirusCheckDomain virusCheckDomain;

        public SongsController()
        {
            songDomain = new SongDomain();
            virusCheckDomain = new VirusCheckDomain();
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<SongOverviewDto>>> Songs()
        {
            var songOverviewDtos = await songDomain.GetSongsForOverviewAsync();
            return Ok(songOverviewDtos);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("{songKey}")]
        public async Task<ActionResult<SongOverviewDto>> Song(int songKey)
        {
            var songOverviewDto = await songDomain.GetSongForOverviewAsync(songKey);
            return Ok(songOverviewDto);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("initialImport")]
        public async Task<ActionResult<string>> InitialImport()
        {
            try
            {
                var localFileHandler = new LocalFileHandlerDomain();

                DirectoryInfo importDirectoryInfo = new(@"C:\Temp\ATCD");
                foreach (var atsFileInfo in importDirectoryInfo.GetFiles("*.ats"))
                {
                    var atsContent = System.IO.File.ReadAllText(atsFileInfo.FullName);
                    SongDto songDto = JsonSerializer.Deserialize<SongDto>(atsContent);

                    // Check .ats file for viruses
                    using (var ms = new MemoryStream())
                    {
                        atsFileInfo.OpenRead().CopyTo(ms);
                        byte[] fileBytes = ms.ToArray();
                        var scanResult = await virusCheckDomain.CheckForVirusAsync(fileBytes);
                        if (scanResult.Result != ClamScanResults.Clean) continue;

                        localFileHandler.StoreFile(songDto.Metadata.SongId, atsContent, "ats");
                    }

                    var oggFileInfo = importDirectoryInfo.GetFiles(songDto.Metadata.SongFilename).Single();
                    using (var ms = new MemoryStream())
                    {
                        oggFileInfo.OpenRead().CopyTo(ms);
                        byte[] fileBytes = ms.ToArray();
                        var scanResult = await virusCheckDomain.CheckForVirusAsync(fileBytes);
                        if (scanResult.Result != ClamScanResults.Clean) continue;

                        localFileHandler.StoreFile(songDto.Metadata.SongId, fileBytes, "ogg");
                    }

                    await songDomain.SaveSongAsync(songDto);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}