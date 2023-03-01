CREATE TABLE [dbo].[Choreography] (
    [ChoreographyKey] INT           IDENTITY (1, 1) NOT NULL,
    [SongKey]         INT           NOT NULL,
    [Name]            VARCHAR (50)  NOT NULL,
    [Data]            VARCHAR (MAX) NOT NULL,
    CONSTRAINT [PK_Choreography] PRIMARY KEY CLUSTERED ([ChoreographyKey] ASC)
);

