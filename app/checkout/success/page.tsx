export default function SuccessPage() {
  return (
    <div className="card">
      <h1 className="text-2xl font-semibold">Payment Successful</h1>
      <p className="text-[color:var(--muted)] mt-2">Your license email is on the way. You can also find your orders in the <a className="link" href="/account">Account</a> page.</p>
    </div>
  );
}
