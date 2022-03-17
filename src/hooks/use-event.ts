export const useEvent = (context: any = document) => {
    const dispatch = <TDetail>(EVENT_NAME: string, detail: TDetail) => {
        context.dispatchEvent(new CustomEvent(EVENT_NAME, { detail }))
    }

    const listen = <TDetail>(EVENT_NAME: string, handler: (e: CustomEvent<TDetail>) => void) =>
        context.addEventListener(EVENT_NAME, handler)

    const omit = <TDetail>(EVENT_NAME: string, handler: (e: CustomEvent<TDetail>) => void) =>
        context.removeEventListener(EVENT_NAME, handler);

    return { dispatch, listen, omit };
}
