const credentials = JSON.parse(
  JSON.stringify({
    type: "service_account",
    project_id: "clickandadopt-356914",
    private_key_id: "eed1d783ba81b286e9d85b875ce75b00d00319f5",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDJMgDWZe9F3uey\nT1+3yB8gV/dDTKbGZyfDTkXMwg2HfbZXidMZeN/Gh+PRGtWKYreA1z/3yJ814cbH\nWX1roWFb4EW5W7pchWpgTVT5RRQasfONnnhUcEnzEkaFKscBHDZuldC2QRR2nrbM\ntD7YvfijFbE8VAskQWgKHRK6A+C7GRVBg1vGe8tjgK+AtQSfxPz9UCq2TZdv0ptn\nGFHCH76tsCurUmnvV3gKH+rcovW0XKSruc/tTkr373KLaTyHUsenI0xVGyBdFn5a\nzJUJWpmNZ9xnYVcVcwcDZxj/JejXQR4rps/SayKJ1KXcNr0m4yOmSVqRXTag16h2\nnN7Y0os/AgMBAAECggEAJTcpHX9kd4WoUPzKpUmQrGBpHds/XCK3obJISfw5GW9g\n+6dEU4lexy/arZKrnjntXJk0PWawQHy/Up+UigSjaCW/b+5uNe/9wct8JNGoytlQ\nxkjiVCgjHaGrRrWncuafkOwIW7YFDX4FLS9IErptE+mOy6x2FSI+FuTS0nKmLqU8\nayADa5yysMZEtb1lSa2ysHa/pdN3okwIPbfCZ2cDXArQ8tRjk3GfZikoGXpkF+9E\n8iz8RIsS9689qIJ4/dL//RNzPziBjIUu0L0tG2G+oMUtQj8CtpvXO6NYGjhIcInT\njrSAmfsav5jFXgW6dXRGbD0dFFXkHuLNrPFyWJ1IXQKBgQD1AEWKpOCwc31mLgwP\nXPo6U4KGauaULYHXvnr3pHcuxCJgSgYql2mou6Uslo7SP+vjjH3i7nUpBoNtEMWN\n9og2D7Mq/aPULITtZemBHWD4uZyALONe+Vbv26rwJtCyvsPfJ79ac+lffSFWcRFX\nA401xXWoNHgaKqWoUrtH2elYvQKBgQDSOkjcTMdUeTSIiemRNsa9gdQkyLENa/IU\n/7xnMeQZH69/o15Al8ufmyrcHu/mHzuy05ITrAx9oYIKPF70QiuI684DUbTBUZzu\nWf0LnFfa/vErxoH2Fy12kNC5IXoEJTe2w0hUZ5qyd8nFDH6JlJBq3QZkzGW4IBmO\nMbCMXJYpqwKBgCmkQS2edn4nMwIiA3S9Bd7SANZd5xD6Zx5HRtk+f+9X8MvS6Rdm\nItRGCH36nQ3JRYuofmEKzKkLbV0lQ56sb1xY8Mf20limtHUxJC4I00mTKrFyb7bd\nxFQCTxyATGqFF/+e3tw95UWQnBD4KM1UUjT4edX8DQnNg9iHL0O4Gvw1AoGAUikf\nQqHrITOBeX9UvkEHKRctXvbkY1d1tAlCi54vBDai8yJY+quYlBcjiAW7QlegkEIp\ni/CorQzK8s8nWRTnSMrHp/ptx0PrLigTQk9m8prCjJY3QoNKbFUqjb/snOQiwxXN\nFder2OYCADXi2kgqrOkWz5wmgPBirHT1B9ZDhaMCgYBi2nsjNyb7xBNG4b918PbZ\nLN3j06oez86CormhiRC+AJz5dcDGSby4MUNM7lmfXK2pjRuO3NMWaVM3fOnXGxOr\n5ynf6CBAKvuu+ag9T+6/XUwPClSHfIVo0rlvo44Bt7tfvA9rg/ok7DCT0chzRDmc\nUol3qy3umCL3nntkF1eoAA==\n-----END PRIVATE KEY-----\n",
    client_email:
      "click-and-adopt-ia@clickandadopt-356914.iam.gserviceaccount.com",
    client_id: "116237159228721304450",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/click-and-adopt-ia%40clickandadopt-356914.iam.gserviceaccount.com",
  })
);

module.exports = {
  CONFIG: {
    credentials: {
      private_key: credentials.private_key,
      client_email: credentials.client_email,
    },
  },
};
