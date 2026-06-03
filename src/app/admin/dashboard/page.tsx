// Add this after your useState declarations
useEffect(() => {
  const auth = localStorage.getItem('adminAuth')
  const expiry = localStorage.getItem('adminExpiry')
  
  // Check if session exists and is valid
  if (!auth || auth !== 'true') {
    router.push('/admin/login')
    return
  }
  
  if (expiry && new Date().getTime() > parseInt(expiry)) {
    // Session expired
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminExpiry')
    localStorage.removeItem('adminUser')
    router.push('/admin/login')
    return
  }
}, [router])