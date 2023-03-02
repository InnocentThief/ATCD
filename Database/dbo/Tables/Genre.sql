CREATE TABLE [dbo].[Genre] (
    [GenreKey]    INT          IDENTITY (1, 1) NOT NULL,
    [DisplayName] VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Genre] PRIMARY KEY CLUSTERED ([GenreKey] ASC)
);

