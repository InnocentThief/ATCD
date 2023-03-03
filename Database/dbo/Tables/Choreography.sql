CREATE TABLE [dbo].[Choreography] (
    [ChoreographyKey]    INT           IDENTITY (1, 1) NOT NULL,
    [SongKey]            INT           NOT NULL,
    [Id]                 VARCHAR (200) NOT NULL,
    [Descriptor]         VARCHAR (50)  NOT NULL,
    [Name]               VARCHAR (50)  NOT NULL,
    [GemSpeed]           FLOAT (53)    NOT NULL,
    [GemRadius]          FLOAT (53)    NOT NULL,
    [HandRadius]         FLOAT (53)    NOT NULL,
    [AnimClipPath]       VARCHAR (50)  NOT NULL,
    [BuildVersion]       VARCHAR (50)  NOT NULL,
    [RequiredModalities] INT           NOT NULL,
    [ChoreoType]         INT           NOT NULL,
    CONSTRAINT [PK_Choreography] PRIMARY KEY CLUSTERED ([ChoreographyKey] ASC),
    CONSTRAINT [FK_Choreography_Song] FOREIGN KEY ([SongKey]) REFERENCES [dbo].[Song] ([SongKey])
);



