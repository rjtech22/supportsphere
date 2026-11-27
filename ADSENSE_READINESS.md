# ResolveNexa AdSense activation checklist

The production code keeps AdSense disabled until the real publisher configuration is available. Never add placeholder publisher or slot IDs.

## Manual Google account steps

1. Create or open the legitimate site owner's AdSense account.
2. Add the current production URL and complete Google's ownership review.
3. In AdSense **Privacy & messaging**, configure Google's certified European regulations message before serving personalised ads in the EEA, UK or Switzerland.
4. Create the required ad units only after the account permits it.
5. Copy the exact publisher and slot IDs from AdSense. Do not share account credentials or payment details in source control.

## Vercel production variables

Set these only after the matching Google steps are complete:

```text
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_TOP=1234567890
ADSENSE_PUBLISHER_ID=pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_GOOGLE_CERTIFIED_CMP_CONFIGURED=true
NEXT_PUBLIC_ADSENSE_ENABLED=true
```

`ADSENSE_PUBLISHER_ID` is server-only. The public client ID and slot IDs are expected in rendered ad markup. After deployment, verify `/ads.txt` returns the exact line supplied for the account.

## Safety checks before enabling

- Confirm the Privacy, About, Contact, Terms and Disclaimer pages are accessible.
- Confirm the Google-certified consent message works in the required regions.
- Confirm ads are labelled and separated from navigation, complaint tools and official-support buttons.
- Test desktop and mobile layouts for content movement and accidental-click risk.
- Do not click live ads or ask anyone to click them.
- Do not purchase automated, incentivised or low-quality traffic.
- Monitor AdSense Policy Center, invalid traffic, GA4 traffic sources and Core Web Vitals.

## Current placement strategy

ResolveNexa exposes one in-article slot at the end of English company and guide content. It renders nothing until all required environment flags, a valid client ID and a valid numeric slot ID are present. This conservative placement avoids inserting ads beside official support actions, search controls or complaint-generator inputs.
