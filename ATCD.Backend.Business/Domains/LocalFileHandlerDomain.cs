namespace ATCD.Backend.Business.Domains
{
    internal class LocalFileHandlerDomain : FileHandlerDomainBase
    {
        readonly DirectoryInfo storageDirectoryInfo = new(@"C:\Temp\ATCDStorage");

        internal override string StoreFile(string songId, string fileContent, string fileExtension)
        {
            var filePath = Path.Combine(storageDirectoryInfo.FullName, $"{songId}.{fileExtension}");
            File.WriteAllText(filePath, fileContent);
            return filePath;
        }

        internal override string StoreFile(string songId, byte[] fileContent, string fileExtension)
        {
            var filePath = Path.Combine(storageDirectoryInfo.FullName, $"{songId}.{fileExtension}");
            using var writer = new BinaryWriter(File.OpenWrite(filePath));
            writer.Write(fileContent);
            return filePath;
        }
    }
}