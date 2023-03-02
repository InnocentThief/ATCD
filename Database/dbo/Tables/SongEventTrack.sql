CREATE TABLE [dbo].[SongEventTrack] (
    [SongEventTrackKey] INT           IDENTITY (1, 1) NOT NULL,
    [SongId]            INT           NOT NULL,
    [EventId]           VARCHAR (100) NOT NULL,
    CONSTRAINT [PK_SongEventTrack] PRIMARY KEY CLUSTERED ([SongEventTrackKey] ASC)
);

