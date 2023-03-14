namespace ATCD.DataAccess.Entity
{
    internal class SongOverview
    {
        public int SongKey { get; set; }
        public string Title { get; set; }
        public string Artist { get; set; }
        public string CoverUrl { get; set; }
        public string AuthorKey { get; set; }
        public string Author { get; set; }
        public DateTime Published { get; set; }
    }
}