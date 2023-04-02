using nClam;
using System.Net;

namespace ATCD.Backend.Business.Domains
{
    internal class VirusCheckDomain
    {
        internal async Task<ClamScanResult> CheckForVirusAsync(byte[] fileBytes)
        {
            var clam = new ClamClient("localhost", 3310);
            return await clam.SendAndScanFileAsync(fileBytes);
        }
    }
}