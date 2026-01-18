export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
              const theme = mediaQuery.matches ? 'dark' : 'light';
              document.documentElement.classList.remove('light', 'dark');
              document.documentElement.classList.add(theme);
            } catch (e) {}
          })();
        `,
      }}
    />
  );
}
