using BenefitsPackageCalculator.Core.Interfaces;
using BenefitsPackageCalculator.Models;
using System.Linq;

namespace BenefitsPackageCalculator.Core
{
    public class BenefitCostCalculator : IBenefitCostCalculator
    {
        public double GetTotalCost(BenefitRecipient employee)
        {
            if(string.IsNullOrEmpty(employee.FirstName) || string.IsNullOrEmpty(employee.LastName))
            {
                return 0.0;
            }

            var totalBenefitCost = GetCostForRecipient(employee, 1000.00);

            if (employee.Dependents == null)
            {
                return totalBenefitCost;
            }

            for (var i = 0; i < employee.Dependents.Count; i++)
            {
                totalBenefitCost += GetCostForRecipient(employee.Dependents.ElementAt(i), 500.00);
            }

            return totalBenefitCost;
        } 
        private double GetCostForRecipient(BenefitRecipient benefitRecipient, double startingCost)
        {
            return benefitRecipient.FirstName.ToLower().StartsWith('a') ?
                startingCost - (startingCost * .10) :
                startingCost;
        }
    }
}