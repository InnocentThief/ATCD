namespace ATCD.Backend.Dto.Web
{
    public class SongSearchDto
    {
        public string SearchText { get; set; }

        public int Page { get; set; }

        public int ItemsPerPage { get; set; }

        public List<byte> ChoreoExcludes { get; set; }

        public List<int> Genres { get; set; }

        public List<byte> ChoreoTypes { get; set; }

        public DateTime? PublishedFrom { get; set; }

        public DateTime? PublishedTo { get; set; }
    }
}