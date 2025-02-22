// 定义渐变色配置
export const gradients = {
  blue: 'bg-gradient-to-br from-blue-400 to-indigo-600',
  green: 'bg-gradient-to-br from-green-400 to-emerald-600',
  purple: 'bg-gradient-to-br from-purple-400 to-fuchsia-600',
  orange: 'bg-gradient-to-br from-orange-400 to-red-600',
  teal: 'bg-gradient-to-br from-teal-400 to-cyan-600',
  pink: 'bg-gradient-to-br from-pink-400 to-rose-600',
  amber: 'bg-gradient-to-br from-amber-400 to-orange-600',
  indigo: 'bg-gradient-to-br from-indigo-400 to-purple-600',
  red: 'bg-gradient-to-br from-red-400 to-pink-600',
  yellow: 'bg-gradient-to-br from-yellow-400 to-amber-600',
};

// 根据字符串生成确定的数字
export function getHashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// 根据活动信息获取渐变色
export function getGradientColor(activity) {
  if (!activity) {
    return gradients.blue;
  }

  const identifier = activity.activityId || activity.activityName || '';
  const hashCode = getHashCode(identifier);
  const gradientKeys = Object.keys(gradients);
  const index = hashCode % gradientKeys.length;

  return gradients[gradientKeys[index]];
}