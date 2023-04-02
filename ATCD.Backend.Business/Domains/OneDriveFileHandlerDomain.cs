namespace ATCD.Backend.Business.Domains
{
    internal class OneDriveFileHandlerDomain : FileHandlerDomainBase
    {
        internal override string StoreFile(string songId, string fileContent, string fileExtension)
        {
            throw new NotImplementedException();
        }

        internal override string StoreFile(string songId, byte[] fileContent, string fileExtension)
        {
            throw new NotImplementedException();
        }
    }
}