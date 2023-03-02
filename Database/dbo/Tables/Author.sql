﻿CREATE TABLE [dbo].[Author] (
    [AuthorKey]   INT            IDENTITY (1, 1) NOT NULL,
    [PlatformId]  VARCHAR (50)   NOT NULL,
    [DisplayName] VARCHAR (50)   NOT NULL,
    [AccountId]   VARBINARY (50) NOT NULL,
    CONSTRAINT [PK_Author] PRIMARY KEY CLUSTERED ([AuthorKey] ASC)
);

