using BenefitsPackageCalculator.Core.Interfaces;
using BenefitsPackageCalculator.Models;
using System.Linq;

namespace BenefitsPackageCalculator.Core
{
    public class BenefitCostCalculator : IBenefitCostCalculator
    {
        public double GetTotalCost(BenefitRecipient employee)
        {
            var totalBenefitCost = employee.FirstName.ToLower().StartsWith('a') ?
                1000.00 - (1000.00 * .10) :
                1000.00;
            for(var i = 0; i < employee.Dependents.Count; i++)
            {
                var dependent = employee.Dependents.ElementAt(i);
                var dependentBenefitCost = dependent.FirstName.ToLower().StartsWith('a') ?
                500.00 - (500.00 * .10) :
                500.00;
                totalBenefitCost += dependentBenefitCost;
            }
            return totalBenefitCost;
        } 
    }
}