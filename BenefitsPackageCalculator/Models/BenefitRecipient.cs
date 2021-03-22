using System.Collections.Generic;

namespace BenefitsPackageCalculator.Models
{
    public class BenefitRecipient
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public double TotalCost { get; set; }
        public List<BenefitRecipient> Dependents { get; set; }
    }
}