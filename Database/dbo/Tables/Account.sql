CREATE TABLE [dbo].[Account] (
    [AccountKey]   INT          IDENTITY (1, 1) NOT NULL,
    [Username]     VARCHAR (50) NOT NULL,
    [PasswordHash] BINARY (32)  NOT NULL,
    [Salt]         BINARY (20)  NOT NULL,
    CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED ([AccountKey] ASC)
);

