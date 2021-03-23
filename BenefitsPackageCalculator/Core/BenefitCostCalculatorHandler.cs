using BenefitsPackageCalculator.Core.Interfaces;
using BenefitsPackageCalculator.Models;

namespace BenefitsPackageCalculator.Core
{
    public class BenefitCostCalculatorHandler : IBenefitCostCalculatorHandler
    {
        private IBenefitCostCalculator _benefitCostCalculator;
        public BenefitCostCalculatorHandler(IBenefitCostCalculator benefitCostCalculator)
        {
            _benefitCostCalculator = benefitCostCalculator;
        }
        public double GetTotalCost(BenefitRecipient employee)
        {
            return _benefitCostCalculator.GetTotalCost(employee);
        }
    }
}