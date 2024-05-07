/**
 * Only works on ARM64
 */
const openImpl = Module.getExportByName(null, 'open');

Interceptor.attach(openImpl, new CModule(`
#include <gum/guminterceptor.h>

extern void onMessage (const gchar * message);
static void log (const gchar * format, ...);

void onEnter (GumInvocationContext * ic)
{
    const char * path;
    path = gum_invocation_context_get_nth_argument (ic, 0);
    log ("open() path=\\"%s\\"", path);
}

void onLeave (GumInvocationContext * ic)
{
    unsigned long long fd;
    fd = (unsigned long long)gum_invocation_context_get_return_value (ic);
    log ("=> fd=%d", fd);
}

static void log (const gchar * format, ...)
{
    gchar * message;
    va_list args;
    va_start (args, format);
    message = g_strdup_vprintf (format, args);
    va_end (args);
    onMessage (message);
    g_free (message);
}
`, {
  onMessage: new NativeCallback(messagePtr => {
    const message = messagePtr.readUtf8String();
    console.log('onMessage:', message);
  }, 'void', ['pointer'])
}));