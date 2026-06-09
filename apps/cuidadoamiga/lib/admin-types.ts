// Admin panel content types.

export interface AdminContent {
  panel: {
    title: string
    subtitle: string
    logout: string
    loggedInAs: string
    owner: string
    mod: string
  }
  tabs: {
    validar: string
    pendiente: string
    aprobado: string
    rechazado: string
    solicitudes: string
    crear: string
  }
  filters: {
    all: string
    femicidio: string
    abuso: string
    acoso: string
    search: string
  }
  case: {
    submittedBy: string
    type: string
    location: string
    victim: string
    description: string
    sources: string
    noSources: string
    viewOnMap: string
    viewDetail: string
    edit: string
    delete: string
    approve: string
    reject: string
    rejectionReason: string
    alreadyVoted: string
    voteCount: string
    votesCast: string
    votes: string
  }
  vote: {
    approved: string
    rejected: string
    alreadyVoted: string
    noLongerPending: string
    error: string
  }
  edit: {
    title: string
    save: string
    saving: string
    saved: string
    error: string
  }
  delete: {
    title: string
    confirm: string
    warning: string
    yes: string
    deleted: string
  }
  empty: {
    validar: string
    pendiente: string
    aprobado: string
    rechazado: string
    solicitudes: string
    crear: string
  }
  solicitud: {
    title: string
    approve: string
    reject: string
    pending: string
    approved: string
    rejected: string
    approved_ok: string
    rejected_ok: string
  }
  create: {
    title: string
    description: string
    submit: string
    submitting: string
    created: string
    error: string
  }
}
