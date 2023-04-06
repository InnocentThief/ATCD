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
        private readonly ImportDomain importDomain;
        private readonly SongDomain songDomain;

        public SongsController()
        {
            importDomain = new ImportDomain();
            songDomain = new SongDomain();
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
                await importDomain.PerformInitialImportAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}