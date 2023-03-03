CREATE TABLE [dbo].[TrackEvent] (
    [TrackEventKey]      INT            IDENTITY (1, 1) NOT NULL,
    [SongEventTrackKey]  INT            NOT NULL,
    [StartTimeInSeconds] FLOAT (53)     NOT NULL,
    [EndTimeInSeconds]   FLOAT (53)     NOT NULL,
    [PayloadType]        INT            NOT NULL,
    [Payload]            VARCHAR (1000) NOT NULL,
    CONSTRAINT [PK_TrackEvent] PRIMARY KEY CLUSTERED ([TrackEventKey] ASC),
    CONSTRAINT [FK_TrackEvent_SongEventTrack] FOREIGN KEY ([SongEventTrackKey]) REFERENCES [dbo].[SongEventTrack] ([SongEventTrackKey])
);



