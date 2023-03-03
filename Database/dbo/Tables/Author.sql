CREATE TABLE [dbo].[Author] (
    [AuthorKey]   INT            IDENTITY (1, 1) NOT NULL,
    [AccountKey]  INT            NOT NULL,
    [PlatformId]  VARCHAR (50)   NOT NULL,
    [DisplayName] VARCHAR (50)   NOT NULL,
    [AccountId]   VARBINARY (50) NOT NULL,
    CONSTRAINT [PK_Author] PRIMARY KEY CLUSTERED ([AuthorKey] ASC),
    CONSTRAINT [FK_Author_Account] FOREIGN KEY ([AccountKey]) REFERENCES [dbo].[Account] ([AccountKey])
);



