// Values shared by every page. {{KEY}} tokens in the HTML are replaced at build time.
// TODO(owner): replace the placeholders marked TODO before publishing.
export default {
  // The public project that holds releases and nothing else (the source stays private).
  RELEASES_URL: 'https://gitlab.com/whiteroomos/releases/-/releases',
  // Where the one-line installers live: a fixed address that does not change with the version.
  INSTALL_URL: 'https://gitlab.com/api/v4/projects/whiteroomos%2Freleases/packages/generic/stable/latest',
  // The Linux Flatpak of Sill, a single file attached to the app's release.
  FLATPAK_URL: 'https://gitlab.com/whiteroomos/releases/-/releases/v0.1.0/downloads/Sill_0.1.0_x86_64.flatpak',
  // The PDF Editor is its own release (pdf-v...), downloaded by hand for now.
  PDF_EDITOR_URL: 'https://gitlab.com/whiteroomos/releases/-/releases/pdf-v0.1.0',
  // TODO: confirm the contact address (taken from the branding demo).
  CONTACT_EMAIL: 'hello@whiteroom.os',
  // TODO: confirm the legal entity, jurisdiction and effective date used in the Terms and Privacy pages.
  ENTITY: 'White Room OS [TO CONFIRM: legal entity]',
  JURISDICTION: '[TO CONFIRM: governing law / jurisdiction]',
  UPDATED: '17 October 2026',
}
