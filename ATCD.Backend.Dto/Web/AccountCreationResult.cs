using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATCD.Backend.Dto.Web
{
    public enum AccountCreationResult
    {
        Success = 1,
        UsernameAlreadyExists = 2,
        PasswordRepeatWrong = 3,
        PasswordRuleViolation = 4

    }
}