using BenefitsPackageCalculator.Core.Interfaces;
using BenefitsPackageCalculator.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenefitsPackageCalculator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BenefitCalculationController : ControllerBase
    {
        private readonly IBenefitCostCalculator _benefitCostCalculator;
        public BenefitCalculationController(IBenefitCostCalculator benefitCostCalculator)
        {
            _benefitCostCalculator = benefitCostCalculator;
        }

        [Route("GetCalculationForBenefits/{data}")]
        [HttpGet]
        public string GetCalculationForBenefits(string data)
        {
            var employee = JsonConvert.DeserializeObject<BenefitRecipient>(data);
            employee.TotalCost = _benefitCostCalculator.GetTotalCost(employee);
            return JsonConvert.SerializeObject(employee);
        }
    }
}