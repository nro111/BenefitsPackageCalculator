using BenefitsPackageCalculator.Models;

namespace BenefitsPackageCalculator.Core.Interfaces
{
    public interface IBenefitCostCalculatorHandler
    {
        public double GetTotalCost(BenefitRecipient employee);
    }
}
