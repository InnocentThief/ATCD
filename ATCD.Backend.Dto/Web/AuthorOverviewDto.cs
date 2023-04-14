namespace ATCD.Backend.Dto.Web
{
    public class AuthorOverviewDto
    {
        public int AuthorKey { get; set; }
        public string DisplayName { get; set; }
        public string PlatformId { get; set; }
        public string AccountId { get; set; }
        public string Description { get; set; }
        public DateTime FirstPublished { get; set; }
        public DateTime LastPublished { get; set; }
        public double AvgBpm { get; set; }
        public string AvgDuration { get; set; }
        public int TotalSongs { get; set; }
    }
}