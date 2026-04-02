export function useLandingData() {
  const { data: contacts } = useApi<any[]>('/contacts')
  
  const activeContact = computed(() => {
    if (!contacts.value || !Array.isArray(contacts.value)) return null
    return contacts.value.find((c: any) => c.is_active)
  })

  const whatsappLink = computed(() => {
    if (!activeContact.value) return '#'
    const number = activeContact.value.phone_number
    return `https://wa.me/62${number}?text=Halo%20Admin%20Express%20Laundry,%20saya%20ingin%20memesan%20layanan%20laundry.`
  })

  return {
    contacts,
    activeContact,
    whatsappLink
  }
}
