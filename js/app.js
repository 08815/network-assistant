// js/app.js - 通用工具函数

// 显示Toast提示
function showToast(message, duration = 2000) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// 复制文本到剪贴板
function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('已复制到剪贴板');
    }).catch(() => {
      fallbackCopyText(text);
    });
  } else {
    fallbackCopyText(text);
  }
}

// 兼容旧版浏览器的复制方法
function fallbackCopyText(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    showToast('已复制到剪贴板');
  } catch (err) {
    showToast('复制失败');
  }
  
  document.body.removeChild(textarea);
}

// 添加到最近浏览
function addToRecent(id, type, title) {
  let recent = JSON.parse(localStorage.getItem('recentViewed') || '[]');
  
  // 移除已存在的相同项
  recent = recent.filter(item => !(item.id === id && item.type === type));
  
  // 添加到开头
  recent.unshift({
    id: id,
    type: type,
    title: title,
    time: new Date().toLocaleString()
  });
  
  // 最多保留20条
  if (recent.length > 20) {
    recent = recent.slice(0, 20);
  }
  
  localStorage.setItem('recentViewed', JSON.stringify(recent));
}

// 获取URL参数
function getUrlParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

// 页面跳转并携带参数
function navigateTo(url, params = {}) {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  
  if (queryString) {
    window.location.href = `${url}?${queryString}`;
  } else {
    window.location.href = url;
  }
}

// 显示/隐藏Loading
function showLoading(show) {
  let loading = document.getElementById('global-loading');
  
  if (show && !loading) {
    loading = document.createElement('div');
    loading.id = 'global-loading';
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-dot"></div><div class="loading-dot"></div><div class="loading-dot"></div>';
    loading.style.position = 'fixed';
    loading.style.top = '50%';
    loading.style.left = '50%';
    loading.style.transform = 'translate(-50%, -50%)';
    loading.style.zIndex = '300';
    document.body.appendChild(loading);
  } else if (!show && loading) {
    loading.remove();
  }
}

// 格式化日期
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 防抖函数
function debounce(func, wait = 300) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// 节流函数
function throttle(func, limit = 300) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
