﻿CREATE TABLE [dbo].[Song] (
    [SongKey]                     INT            IDENTITY (1, 1) NOT NULL,
    [Custom]                      BIT            NOT NULL,
    [AuthorKey]                   INT            NOT NULL,
    [SongId]                      VARCHAR (200)  NOT NULL,
    [Title]                       VARCHAR (100)  NOT NULL,
    [Artiste]                     VARCHAR (100)  NOT NULL,
    [KoreographyKey]              INT            NOT NULL,
    [Descriptor]                  VARCHAR (50)   NOT NULL,
    [SceneName]                   VARCHAR (50)   NOT NULL,
    [AvgBpm]                      FLOAT (53)     NOT NULL,
    [SongURL]                     VARCHAR (400)  NOT NULL,
    [FirstBeatTimeInSeconds]      FLOAT (53)     NOT NULL,
    [SongEndTimeInSeconds]        FLOAT (53)     NOT NULL,
    [SongShortStartTimeInSeconds] FLOAT (53)     NOT NULL,
    [SongShortStopTimeInSeconds]  FLOAT (53)     NOT NULL,
    [LeadingSilenceSeconds]       FLOAT (53)     NOT NULL,
    [SongFullLengthInSeconds]     FLOAT (53)     NOT NULL,
    [SongShortLengthInSeconds]    FLOAT (53)     NOT NULL,
    [SongStartFadeTime]           FLOAT (53)     NOT NULL,
    [SongEndFadeTime]             FLOAT (53)     NOT NULL,
    [PreviewStartInSeconds]       FLOAT (53)     NOT NULL,
    [PreviewDurationInSeconds]    FLOAT (53)     NOT NULL,
    [SongStartBufferInSeconds]    FLOAT (53)     NOT NULL,
    [Speed]                       FLOAT (53)     NOT NULL,
    [QuantizeSize]                FLOAT (53)     NOT NULL,
    [IncludeInArcades]            BIT            NOT NULL,
    [SupportedModalitySets]       INT            NOT NULL,
    [DrumMedSfx]                  VARCHAR (50)   NOT NULL,
    [DrumMaxSfx]                  VARBINARY (50) NOT NULL,
    [GenreKey]                    INT            NOT NULL,
    [Description]                 VARCHAR (200)  NOT NULL,
    [Explicit]                    BIT            NOT NULL,
    [Challenge]                   BIT            NOT NULL,
    [ContentStrike]               BIT            NOT NULL,
    [Released]                    DATETIME       NOT NULL,
    CONSTRAINT [PK_Song] PRIMARY KEY CLUSTERED ([SongKey] ASC),
    CONSTRAINT [FK_Song_Genre] FOREIGN KEY ([GenreKey]) REFERENCES [dbo].[Genre] ([GenreKey]),
    CONSTRAINT [FK_Song_Koreography] FOREIGN KEY ([KoreographyKey]) REFERENCES [dbo].[Koreography] ([KoreographyKey])
);



