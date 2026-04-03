#!/usr/bin/env bash
# Usage: ./update-pkgbuild.sh 0.57.16
set -euo pipefail

VERSION="${1:?Usage: $0 <version>}"
DEB_URL="https://github.com/nobsagile/cylenivo/releases/download/v${VERSION}/Cylenivo_${VERSION}_amd64.deb"

echo "Fetching sha256 for v${VERSION}..."
SHA256=$(curl -sL "$DEB_URL" | sha256sum | awk '{print $1}')
echo "sha256: $SHA256"

sed -i "s/^pkgver=.*/pkgver=${VERSION}/" PKGBUILD
sed -i "s/sha256sums_x86_64=('.*')/sha256sums_x86_64=('${SHA256}')/" PKGBUILD

# Update .SRCINFO
sed -i "s/pkgver = .*/pkgver = ${VERSION}/" .SRCINFO
sed -i "s|source_x86_64 = .*|source_x86_64 = cylenivo-bin-${VERSION}.deb::https://github.com/nobsagile/cylenivo/releases/download/v${VERSION}/Cylenivo_${VERSION}_amd64.deb|" .SRCINFO
sed -i "s/sha256sums_x86_64 = .*/sha256sums_x86_64 = ${SHA256}/" .SRCINFO

echo "Updated PKGBUILD and .SRCINFO to v${VERSION}"
