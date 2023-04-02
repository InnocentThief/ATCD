namespace ATCD.Backend.Business.Domains
{
    internal abstract class FileHandlerDomainBase
    {
        internal abstract string StoreFile(string songId, string fileContent, string fileExtension);

        internal abstract string StoreFile(string songId, byte[] fileContent, string fileExtension);
    }
}