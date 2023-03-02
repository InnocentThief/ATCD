CREATE TABLE [dbo].[Koreography] (
    [KoreographyKey] INT IDENTITY (1, 1) NOT NULL,
    [SongKey]        INT NOT NULL,
    [FileId]         INT NOT NULL,
    [PathId]         INT NOT NULL,
    CONSTRAINT [PK_Koreography] PRIMARY KEY CLUSTERED ([KoreographyKey] ASC)
);

