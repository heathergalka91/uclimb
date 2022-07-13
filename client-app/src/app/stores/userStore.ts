import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { Profile } from "../models/profile";
import { User, UserFormvalues } from "../models/user";
import { store } from "./store";

export default class UserStore {
  user: User | null = null;
  fbAccessToken: string | null = null;
  fbLoading = false;
  refreshTokenTimeout: any;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormvalues) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => (this.user = user));
      history.push("/activities");
      store.modalStore.closeModal();
    } catch (err) {
      throw err;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    history.push("/");
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      this.startRefreshTokenTimer(user);
    } catch (err) {
      console.log(err);
    }
  };

  register = async (creds: UserFormvalues) => {
    try {
      const user = await agent.Account.register(creds);
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => (this.user = user));
      history.push("/activities");
      store.modalStore.closeModal();
      store.modalStore.closeModal();
    } catch (err) {
      throw err;
    }
  };

  setImage = (image: string) => {
    if (this.user) {
      this.user.image = image;
    }
  };

  setDisplayName = (displayName: string) => {
    this.user!.displayName = displayName;
  };

  getFacebokLoginStatus = async () => {
    window.FB.getLoginStatus((response) => {
      if (response.status === "connected") {
        this.fbAccessToken = response.authResponse.accessToken;
      }
    });
  };

  facebookLogin = () => {
    this.fbLoading = true;
    const apiLogin = (accessToken: string) => {
      agent.Account.fbLogin(accessToken)
        .then((user) => {
          store.commonStore.setToken(user.token);
          this.startRefreshTokenTimer(user);

          runInAction(() => {
            this.user = user;
            this.fbLoading = false;
          });
          history.push("/activities");
        })
        .catch((err) => {
          console.log(err);
          runInAction(() => (this.fbLoading = false));
        });
    };

    if (this.fbAccessToken) {
      apiLogin(this.fbAccessToken);
    } else {
      window.FB.login(
        (response) => {
          apiLogin(response.authResponse.accessToken);
        },
        { scope: "public_profile,email" }
      );
    }
  };

  refreshToken = async () => {
    console.log('refreshToken');
    this.stopRefrehsTokenTimer()
    try {
      const user = await agent.Account.refreshToken();
      runInAction(() => (this.user = user));
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
    } catch (err) {
      console.log(err);
    }
  };

  private startRefreshTokenTimer(user: User) {
    const jwtToken = JSON.parse(atob(user.token.split(".")[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
  }

  private stopRefrehsTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
