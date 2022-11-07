import { Link } from 'theme-ui'

const FooterLink = () => {
  return (
    <Link
      variant="footer"
      href={`https://go.nordvpn.net/aff_c?offer_id=15&aff_id=79520&url_id=902`}
      target="_blank"
    >
      Vytal does not change your IP address. To change your IP you will need to
      use a VPN such as{' '}
      <Link
        variant="hover"
        href={`https://go.nordvpn.net/aff_c?offer_id=15&aff_id=79520&url_id=902`}
        target="_blank"
      >
        NordVPN
      </Link>{' '}
      or{' '}
      <Link
        variant="hover"
        href={`https://go.getproton.me/aff_c?offer_id=26&aff_id=3825`}
        target="_blank"
      >
        ProtonVPN
      </Link>
    </Link>
  )
}

export default FooterLink
