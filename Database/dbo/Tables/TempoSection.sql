CREATE TABLE [dbo].[TempoSection] (
    [TempoSectionKey]     INT        IDENTITY (1, 1) NOT NULL,
    [SongKey]             INT        NOT NULL,
    [StartTimeInSeconds]  FLOAT (53) NOT NULL,
    [BeatsPerMeasure]     INT        NOT NULL,
    [BeatsPerMinute]      FLOAT (53) NOT NULL,
    [DoesStartNewMeasure] BIT        NOT NULL,
    CONSTRAINT [PK_TempoSection] PRIMARY KEY CLUSTERED ([TempoSectionKey] ASC),
    CONSTRAINT [FK_TempoSection_Song] FOREIGN KEY ([SongKey]) REFERENCES [dbo].[Song] ([SongKey])
);



