module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // apiCloseUrl: "http://localhost:5000", //config dev
    apiCloseUrl: "http://172.18.141.41:3131", //config prod
    endpointAD: "/login/",
    endpointCreateAlert: "/createAlert/",
    endpointEsbGet: "/esbGet/",
    endpointFetchService: "/fetchService/",
    endpointUpdateCache: "/updateCacheESB/",
    endpointAuditTrail: "/audit/",
    endpointLaunchAnsible: "/launch-ansible/",
    endpointSshRemove: "/ssh-remove-au",
    endpointSshLogon: "/ssh-logon-au",
    endpointSshRemove1: "/ssh-remove-7168",
    endpointSshLogon2: "/ssh-logon-7168",
    endpointSshRemove2: "/ssh-remove-7169",
    endpointSshLogon2: "/ssh-logon-7169",
  },
};
