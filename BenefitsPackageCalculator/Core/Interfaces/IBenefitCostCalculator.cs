using BenefitsPackageCalculator.Models;

namespace BenefitsPackageCalculator.Core.Interfaces
{
    public interface IBenefitCostCalculator
    {
        public double GetTotalCost(BenefitRecipient employee);
    }
}
