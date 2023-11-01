﻿using SurveyTask.Models.WeightVersionClass;

namespace SurveyTask.Models.WeightClass
{
    public class WeightWrite
    {
        public int WeightVersionId { get; set; }

        public int Index { get; set; }

        public double Value { get; set; }

        public DateTime? DeletedAt { get; set; }
    }
}
