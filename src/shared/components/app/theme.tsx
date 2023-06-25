import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { I18NextService, UserService } from "../../services";

interface Props {
  defaultTheme: string;
}

export class Theme extends Component<Props> {
  render() {
    const user = UserService.Instance.myUserInfo;
    const hasTheme = user?.local_user_view.local_user.theme !== "browser";
    const hasRtlInterface =
      I18NextService.i18n.resolvedLanguage === "ar" ? ".rtl" : "";

    if (user && hasTheme) {
      return (
        <Helmet>
          <link
            rel="stylesheet"
            type="text/css"
            href={`/css/themes/${user.local_user_view.local_user.theme}${hasRtlInterface}.css`}
          />
        </Helmet>
      );
    } else if (this.props.defaultTheme != "browser") {
      return (
        <Helmet>
          <link
            rel="stylesheet"
            type="text/css"
            href={`/css/themes/${this.props.defaultTheme}${hasRtlInterface}.css`}
          />
        </Helmet>
      );
    } else {
      return (
        <Helmet>
          <link
            rel="stylesheet"
            type="text/css"
            href={`/css/themes/litely${hasRtlInterface}.css`}
            id="default-light"
            media="(prefers-color-scheme: light)"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href={`/css/themes/darkly${hasRtlInterface}.css`}
            id="default-dark"
            media="(prefers-color-scheme: no-preference), (prefers-color-scheme: dark)"
          />
        </Helmet>
      );
    }
  }
}
