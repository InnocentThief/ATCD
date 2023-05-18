namespace ATCD.Backend.Dto.Web
{
    public class SongOverviewDto
    {
        public int SongKey { get; set; }
        public string Atr { get; set; }
        public string Title { get; set; }
        public string Artist { get; set; }
        public string CoverUrl { get; set; }
        public int AuthorKey { get; set; }
        public string Author { get; set; }
        public DateTime Released { get; set; }
        public int? GenreKey { get; set; }
        public string Genre { get; set; }
        public string AvgBpm { get; set; }
        public string Length { get; set; }
        public string Description { get; set; }
        public bool Explicit { get; set; }
        public bool Challenge { get; set; }
        public bool ContentStrike { get; set; }
        public List<SongOverviewChoreographyDto> Choreographies { get; set; }
    }
}