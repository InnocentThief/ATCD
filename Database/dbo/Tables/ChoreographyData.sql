CREATE TABLE [dbo].[ChoreographyData] (
    [ChoreographyDataKey] INT        IDENTITY (1, 1) NOT NULL,
    [ChoreographyKey]     INT        NOT NULL,
    [Type]                INT        NOT NULL,
    [HasGuide]            BIT        NOT NULL,
    [Beat]                INT        NOT NULL,
    [Numerator]           INT        NOT NULL,
    [Denominator]         INT        NOT NULL,
    [BeatDivision]        INT        NOT NULL,
    [PositionX]           FLOAT (53) NOT NULL,
    [PositionY]           FLOAT (53) NOT NULL,
    [PositionZ]           FLOAT (53) NOT NULL,
    [SubPositionX]        FLOAT (53) NOT NULL,
    [SubPositionY]        FLOAT (53) NOT NULL,
    [SubPositionZ]        FLOAT (53) NOT NULL,
    [BroadcastEventId]    INT        NOT NULL,
    CONSTRAINT [PK_ChoreographyData] PRIMARY KEY CLUSTERED ([ChoreographyDataKey] ASC)
);

