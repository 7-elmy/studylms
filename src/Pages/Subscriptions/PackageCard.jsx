export function PackageCard({
  pkg,
  index,
  isSelected,
  onSelect,
  getDurationIcon,
  getPackageGradient,
  getBadgeColor,
  isRecommended,
  isBestValue,
  getFeatures
}) {
  const { t } = useTranslation();

  return (
    <div className={`relative group transition-all duration-500 hover:scale-105 ${isSelected ? 'scale-105' : ''}`}>
      {/* Recommended/Best Value badges */}
      {isRecommended(pkg.duration_label) && (
        <RecommendedBadge />
      )}
      {isBestValue(pkg.duration_label) && (
        <BestValueBadge />
      )}

      <div className={`relative h-full bg-white rounded-2xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${
        isSelected ? 'border-amber-500 shadow-2xl' : 'border-transparent hover:shadow-2xl'
      }`}>
        {/* Package header */}
        <div className={`bg-gradient-to-r ${getPackageGradient(index)} p-6 text-white relative overflow-hidden`}>
          {/* ... (header content) */}
        </div>

        {/* Package content */}
        <div className="p-6">
          {/* Price section */}
          <div className="text-center mb-6">
            {/* ... (price content) */}
          </div>

          {/* Features list */}
          <div className="space-y-3 mb-8">
            {getFeatures(pkg.duration_label).map((feature, featureIndex) => (
              <FeatureItem key={featureIndex} feature={feature} />
            ))}
          </div>

          {/* Select button */}
          <button
            onClick={() => onSelect(pkg)}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
              isSelected
                ? 'bg-amber-600 text-white shadow-lg'
                : `bg-gradient-to-r ${getPackageGradient(index)} text-white hover:shadow-lg`
            }`}
          >
            {isSelected ? t('packages.selected') : t('packages.startLearning')}
          </button>
        </div>

        {/* Selection indicator */}
        {isSelected && <SelectionIndicator />}
      </div>
    </div>
  );
}