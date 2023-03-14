using ATCD.Backend.Business.Domains;
using ATCD.Backend.Dto.AudioTrip;
using ATCD.Backend.Dto.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace ATCD.Backend.WebApp.Controllers
{
    [Route("api/songs")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        private readonly SongDomain songDomain;

        public SongsController()
        {
            songDomain = new SongDomain();
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<SongOverviewDto>>> Songs()
        {
            var songOverviewDtos = await songDomain.GetSongsForOverview();
            return Ok( songOverviewDtos);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("try")]
        public async Task<ActionResult<string>> TrySomeStuff()
        {
            try
            {
                var file = @"C:\Users\InnocentThief\Downloads\GeoDaSilva_-_Bam_Bam_Boogie_-_Chez\GeoDaSilva - Bam Bam Boogie - Chez\GeoDaSilva & Stephan F - Bam Bam Boogie - Chez-moi.ats";
                var fileContent = System.IO.File.ReadAllText(file);
                SongDto song = JsonSerializer.Deserialize<SongDto>(fileContent);

                var savedSongDto = await songDomain.SaveSongAsync(song);

                var options = new JsonSerializerOptions { WriteIndented = true };
                var content = JsonSerializer.Serialize(savedSongDto, options);
                var newFile = @"C:\Users\InnocentThief\Downloads\GeoDaSilva_-_Bam_Bam_Boogie_-_Chez\GeoDaSilva - Bam Bam Boogie - Chez\GeoDaSilva & Stephan F - Bam Bam Boogie - Chez-moi (from ATCD).ats";
                System.IO.File.WriteAllText(newFile, content);


                return Ok(song);
            }
            catch (Exception ex)
            {

                throw;
            }


        }
    }
}
