import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

const DashboardPage = () => {
  return (
    <PowerBIEmbed
      embedConfig={{
        type: 'report', // can be 'dashboard' or 'tile' if needed
        id: '3d6db32a-924d-4499-aeca-9a8ce97a7a23',
        embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=3d6db32a-924d-4499-aeca-9a8ce97a7a23&autoAuth=true&ctid=57c18621-e6e8-4e92-a6a6-af2b27ae3f02',
        accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkpZaEFjVFBNWl9MWDZEQmxPV1E3SG4wTmVYRSIsImtpZCI6IkpZaEFjVFBNWl9MWDZEQmxPV1E3SG4wTmVYRSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNTdjMTg2MjEtZTZlOC00ZTkyLWE2YTYtYWYyYjI3YWUzZjAyLyIsImlhdCI6MTc1NDYyNjY3NywibmJmIjoxNzU0NjI2Njc3LCJleHAiOjE3NTQ2MzA1NzcsImFpbyI6ImsyUmdZR0NONEgzSkoxTmIySGo2TTZmMlU4RjNBQT09IiwiYXBwaWQiOiI0NWI0M2JlYy02MWRhLTRhYTEtOGJkZS03NTk4MzBkZDcwZDciLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81N2MxODYyMS1lNmU4LTRlOTItYTZhNi1hZjJiMjdhZTNmMDIvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiJmZTYyOGZhNS1jMDczLTRmNTEtOWJhMS1lNjNkNDMxZTQ2NGYiLCJyaCI6IjEuQVhJQUlZYkJWLWpta2s2bXBxOHJKNjRfQWdrQUFBQUFBQUFBd0FBQUFBQUFBQUF3QVFCeUFBLiIsInN1YiI6ImZlNjI4ZmE1LWMwNzMtNGY1MS05YmExLWU2M2Q0MzFlNDY0ZiIsInRpZCI6IjU3YzE4NjIxLWU2ZTgtNGU5Mi1hNmE2LWFmMmIyN2FlM2YwMiIsInV0aSI6Ilo0Wm9LalNhMGtLbUtXdFZmV29QQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfZnRkIjoiZWo0OG8wUTJBZkN0Qm5PeW1NUlVLWkI4c3BBMkxHY05sTzZHZlNWVGtqY0JhMjl5WldGalpXNTBjbUZzTFdSemJYTSIsInhtc19pZHJlbCI6IjcgMjYiLCJ4bXNfcmQiOiIwLjQyTGxZQkppTEJJUzRXQVhFcmlrNGlZNnJTM1pjXzlfTjk2aXlWTEtRRkZPSVlHZjdYMk5zdnVzX0RhdzhBbjE3Rm4xRXlqS0lTVEF5UUFCQjZBMEFBIn0.Ynx6hHjECZnbdbmwDWBk4USOqcdJVnrYy-rumfqT_3RpaJXyuo4EQKd-9fzLi6HT_ITRUEBreAjXC4x8bUPwmbeQrfJlxEAO85wuS2O8AadwklUzoncODa5kzvs265m3pbfEJPxPAKaM-s3un6edTRWaHnk6yArV5oBIc8sp_E7u-ARrGpWnCZpjAi0mlT6KTeGQb_VOhsuTFMuAbM52ui1FUG4OMODQgbmbYn7-3gqFwU1KH4dL3qUhq7a92Qs8tzNsA5BqWspf0s_7Yzs0GKiB7CyCdGsT4Xy177NOlbvuBvvCOuCBNtXZxZGVSxUifv8amHN1EtTqzZGwkS-5qw',
        tokenType: models.TokenType.Embed,
        settings: {
          panes: {
            filters: { visible: false },
            pageNavigation: { visible: true },
          },
        },
      }}
      eventHandlers={
        new Map([
          ['loaded', () => console.log('Report loaded')],
          ['rendered', () => console.log('Report rendered')],
          ['error', (event) => console.error(event.detail)],
        ])
      }
      cssClassName="powerbi-embed"
    />
  );
};

export default DashboardPage;
