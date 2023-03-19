namespace ATCD.Backend.Dto.Web
{
    public class SongOverviewChoreographyDto
    {
        public int ChoreographyKey { get; set; }
        public string Id { get; set; }  
        public string ChoreographyType { get; set; }
        public string DisplayName { get; set; }
        public double GemSpeed { get; set; }
        public double GemRadius { get; set; }
    }
}