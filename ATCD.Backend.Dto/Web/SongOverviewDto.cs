namespace ATCD.Backend.Dto.Web
{
    public class SongOverviewDto
    {
        public int SongKey { get; set; }
        public string Title { get; set; }
        public string Artist { get; set; }
        public string CoverUrl { get; set; }
        public int AuthorKey { get; set; }
        public string Author { get; set; }
        public DateTime Released { get; set; }

        public List<SongOverviewChoreographyDto> Choreographies { get; set; }
    }
}