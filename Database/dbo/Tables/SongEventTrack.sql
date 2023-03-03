CREATE TABLE [dbo].[SongEventTrack] (
    [SongEventTrackKey] INT           IDENTITY (1, 1) NOT NULL,
    [SongKey]           INT           NOT NULL,
    [EventId]           VARCHAR (100) NOT NULL,
    CONSTRAINT [PK_SongEventTrack] PRIMARY KEY CLUSTERED ([SongEventTrackKey] ASC),
    CONSTRAINT [FK_SongEventTrack_Song] FOREIGN KEY ([SongKey]) REFERENCES [dbo].[Song] ([SongKey])
);



